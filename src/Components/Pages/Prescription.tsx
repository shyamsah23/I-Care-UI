import {
  Container,
  Title,
  Text,
  Card,
  Table,
  Group,
  Badge,
  Loader,
  Modal,
  Button,
  TextInput,
  FileInput,
  NumberInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllPrescriptions,
  getMediaById,
  getPrescriptionsForPatient,
  getPrescriptionsFromDoctor,
  createPrescription,
} from "../../Services/MediaService";
import html2pdf from "html2pdf.js";
import { errorNotification } from "../../Utility/NotificationUtility";

export default function Prescription({ role }) {
  const token = useSelector((state: any) => state.jwtSlice);
  const user = useSelector((state: any) => state.userSlice);

  const [prescriptions, setPrescriptions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [expandedRow, setExpandedRow] = useState(null);

  const [fileModal, setFileModal] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const [uploadModal, setUploadModal] = useState(false);

  const [filterPatient, setFilterPatient] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("");

  const [structuredModal, setStructuredModal] = useState(false);

  const [prescriptionForm, setPrescriptionForm] = useState({
    patientId: "",
    patientName: "",
    diagnosis: "",
    notes: "",
    medicines: [{ name: "", dosage: "", frequency: "", duration: 0 }],
  });

  const [form, setForm] = useState({
    file: null as File | null,
    patientId: "",
    patientName: "",
    doctorId: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchData();
  }, [role]);

  useEffect(() => {
    applyFilters();
  }, [filterPatient, filterDoctor, prescriptions]);

  const fetchData = async () => {
    try {
      setLoading(true);

      let data;

      if (role === "ADMIN") {
        data = await getAllPrescriptions(token);
      } else if (role === "DOCTOR") {
        data = await getPrescriptionsFromDoctor(
          token,
          user?.decoded?.profileId,
        );
      } else {
        data = await getPrescriptionsForPatient(
          token,
          user?.decoded?.profileId,
        );
      }

      setPrescriptions(data || []);
      setFiltered(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let temp = prescriptions;

    if (filterPatient) {
      temp = temp.filter((p) =>
        p.patientName.toLowerCase().includes(filterPatient.toLowerCase()),
      );
    }

    if (filterDoctor) {
      temp = temp.filter((p) =>
        p.doctorName.toLowerCase().includes(filterDoctor.toLowerCase()),
      );
    }

    setFiltered(temp);
  };

  const handleViewPrescription = async (mediaId) => {
    const res = await getMediaById(token, mediaId);

    const file = new Blob([res.data], {
      type: res.headers["content-type"],
    });

    const url = URL.createObjectURL(file);
    setFileUrl(url);
    setFileModal(true);
  };

  const handleUpload = async () => {
    try {
      if (!form.file) {
        errorNotification("Please select a file");
        return;
      }

      const formData = new FormData();

      formData.append("file", form.file);

      const doctorId =
        role === "DOCTOR" ? user?.decoded?.profileId : form.doctorId;

      formData.append("doctorId", String(doctorId));
      formData.append("doctorName", user?.decoded?.sub);
      formData.append("patientId", String(form.patientId));
      formData.append("patientName", form.patientName);

      await createPrescription(token, formData);

      setUploadModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const addMedicineRow = () => {
    setPrescriptionForm({
      ...prescriptionForm,
      medicines: [
        ...prescriptionForm.medicines,
        { name: "", dosage: "", frequency: "", duration: 0 },
      ],
    });
  };

  const updateMedicine = (index: number, field: string, value: any) => {
    const updated = [...prescriptionForm.medicines];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setPrescriptionForm({
      ...prescriptionForm,
      medicines: updated,
    });
  };

 const generatePrescriptionPDF = async () => {
   const htmlContent = `
    <div style="padding:20px;font-family:Arial;">
      <h2>Prescription</h2>

      <p><b>Patient:</b> ${prescriptionForm.patientName}</p>
      <p><b>Doctor:</b> ${user?.decoded?.sub}</p>
      <p><b>Date:</b> ${new Date().toLocaleDateString()}</p>

      <h3>Diagnosis</h3>
      <p>${prescriptionForm.diagnosis}</p>

      <h3>Medicines</h3>
      ${prescriptionForm.medicines
        .map(
          (med) =>
            `<p>${med.name} - ${med.dosage} - ${med.frequency} - ${med.duration} days</p>`,
        )
        .join("")}

      <h3>Notes</h3>
      <p>${prescriptionForm.notes}</p>
    </div>
  `;

   const container = document.createElement("div");
   container.innerHTML = htmlContent;
   document.body.appendChild(container);

   const opt = {
     margin: 10,
     filename: "prescription.pdf",
     html2canvas: {
       scale: 2,
     },
     jsPDF: {
       unit: "mm",
       format: "a4",
       orientation: "portrait",
     },
   };

   const pdfBlob = await html2pdf().set(opt).from(container).outputPdf("blob");

   document.body.removeChild(container);

   return new File([pdfBlob], "prescription.pdf", {
     type: "application/pdf",
   });
 };

  const handleCreateStructured = async () => {
    try {
      const file = await generatePrescriptionPDF();

      const formData = new FormData();

      formData.append("file", file);

      formData.append("doctorId", String(user?.decoded?.profileId));
      formData.append("doctorName", user?.decoded?.sub);
      formData.append("patientId", prescriptionForm.patientId);
      formData.append("patientName", prescriptionForm.patientName);

      await createPrescription(token, formData);

      setStructuredModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }} className="overflow-x-auto">
      <Container size="xl">
        <Group justify="space-between" mb={20}>
          <Title>Prescriptions 💊</Title>

          {(role === "ADMIN" || role === "DOCTOR") && (
            <>
              <Button onClick={() => setUploadModal(true)}>Upload</Button>
              <Button onClick={() => setStructuredModal(true)}>
                Create Prescription
              </Button>
            </>
          )}
        </Group>

        <Card mb={20}>
          <Group>
            {(role === "ADMIN" || role === "DOCTOR") && (
              <TextInput
                placeholder="Filter by Patient Name"
                value={filterPatient}
                onChange={(e) => setFilterPatient(e.target.value)}
              />
            )}

            {(role === "ADMIN" || role === "PATIENT") && (
              <TextInput
                placeholder="Filter by Doctor Name"
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
              />
            )}
          </Group>
        </Card>

        <Card>
          {loading ? (
            <Loader />
          ) : (
            <Table highlightOnHover striped>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Patient</Table.Th>
                  <Table.Th>Doctor</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Media ID</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {filtered.map((p) => (
                  <>
                    <Table.Tr
                      key={p.id}
                      onClick={() =>
                        setExpandedRow(expandedRow === p.id ? null : p.id)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <Table.Td>{p.id}</Table.Td>
                      <Table.Td>{p.patientName}</Table.Td>
                      <Table.Td>{p.doctorName}</Table.Td>
                      <Table.Td>{p.createdAt}</Table.Td>
                      <Table.Td>{p.mediaId}</Table.Td>
                      <Table.Td>
                        <Badge>Expand</Badge>
                      </Table.Td>
                    </Table.Tr>

                    {expandedRow === p.id && (
                      <Table.Tr>
                        <Table.Td colSpan={6}>
                          <Button
                            onClick={() => handleViewPrescription(p.mediaId)}
                          >
                            View Prescription
                          </Button>
                        </Table.Td>
                      </Table.Tr>
                    )}
                  </>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </Card>
      </Container>

      {/* VIEW MODAL */}
      <Modal
        opened={fileModal}
        onClose={() => setFileModal(false)}
        size="xl"
        title="Prescription"
      >
        <iframe src={fileUrl} width="100%" height="600px" />
      </Modal>

      {/* UPLOAD MODAL */}
      <Modal
        opened={uploadModal}
        onClose={() => setUploadModal(false)}
        title="Upload Prescription"
      >
        <FileInput
          label="File"
          onChange={(file) => setForm({ ...form, file })}
        />

        <TextInput
          label="Patient ID"
          onChange={(e) => setForm({ ...form, patientId: e.target.value })}
        />

        <TextInput
          label="Patient Name"
          onChange={(e) => setForm({ ...form, patientName: e.target.value })}
        />

        {role === "ADMIN" && (
          <TextInput
            label="Doctor ID"
            onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
          />
        )}

        <Button mt={10} onClick={handleUpload}>
          Submit
        </Button>
      </Modal>

      {/* STRUCTURED MODAL */}
      <Modal
        opened={structuredModal}
        onClose={() => setStructuredModal(false)}
        title="Create Prescription"
        size="lg"
      >
        <TextInput
          label="Patient ID"
          onChange={(e) =>
            setPrescriptionForm({
              ...prescriptionForm,
              patientId: e.target.value,
            })
          }
        />

        <TextInput
          label="Patient Name"
          onChange={(e) =>
            setPrescriptionForm({
              ...prescriptionForm,
              patientName: e.target.value,
            })
          }
        />

        <TextInput
          label="Diagnosis"
          onChange={(e) =>
            setPrescriptionForm({
              ...prescriptionForm,
              diagnosis: e.target.value,
            })
          }
        />

        {prescriptionForm.medicines.map((med, index) => (
          <Group key={index} grow>
            <TextInput
              placeholder="Medicine"
              onChange={(e) => updateMedicine(index, "name", e.target.value)}
            />
            <TextInput
              placeholder="Dosage"
              onChange={(e) => updateMedicine(index, "dosage", e.target.value)}
            />
            <TextInput
              placeholder="Frequency"
              onChange={(e) =>
                updateMedicine(index, "frequency", e.target.value)
              }
            />
            <NumberInput
              placeholder="Days"
              onChange={(val) => updateMedicine(index, "duration", val)}
            />
          </Group>
        ))}

        <Button mt="md" onClick={addMedicineRow}>
          Add Medicine
        </Button>

        <Button mt="lg" onClick={handleCreateStructured}>
          Prescribe
        </Button>
      </Modal>

      {/* ✅ FIXED TEMPLATE (OFFSCREEN) */}
      {isGenerating && (
        <div
          id="prescription-template"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "800px",
            background: "white",
            padding: "20px",
            opacity: 0,
            pointerEvents: "none",
            zIndex: -1,
          }}
        >
          <h2>Prescription</h2>

          <p>
            <b>Patient:</b> {prescriptionForm.patientName}
          </p>
          <p>
            <b>Doctor:</b> {user?.decoded?.sub}
          </p>
          <p>
            <b>Date:</b> {new Date().toLocaleDateString()}
          </p>

          <h3>Diagnosis</h3>
          <p>{prescriptionForm.diagnosis}</p>

          <h3>Medicines</h3>
          {prescriptionForm.medicines.map((med, i) => (
            <p key={i}>
              {med.name} - {med.dosage} - {med.frequency} - {med.duration} days
            </p>
          ))}

          <h3>Notes</h3>
          <p>{prescriptionForm.notes}</p>
        </div>
      )}
    </div>
  );
}
