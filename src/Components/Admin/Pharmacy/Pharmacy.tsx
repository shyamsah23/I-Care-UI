import {
  Card,
  Table,
  Text,
  Group,
  ActionIcon,
  Badge,
  Loader,
  Center,
  Button,
  Modal,
  SimpleGrid,
  TextInput,
  Select,
  NumberInput,
  Divider,
} from "@mantine/core";
import { IconEdit, IconTrash, IconEye, IconPill } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addMedicine,
  getAllMedicines,
} from "../../../Services/PharmacyService";
import { errorNotification } from "../../../Utility/NotificationUtility";

/* ================= API HELPERS ================= */

const getMedicines = async (token: any) => {
  try {
    return await getAllMedicines(token);
  } catch (error: any) {
    errorNotification(
      error?.response?.data?.errorMessage || "Failed to fetch medicines data"
    );
    return [];
  }
};

const addMedicines = async (token: any, medicine: any) => {
  try {
    return await addMedicine(token, medicine);
  } catch (error: any) {
    errorNotification(
      error?.response?.data?.errorMessage || "Failed to add medicine"
    );
    throw error;
  }
};

/* ================= COMPONENT ================= */

export const Pharmacy = () => {
  const token = useSelector((state: any) => state.jwtSlice);

  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);

  const [medicineForm, setMedicineForm] = useState({
    name: "",
    dosage: "",
    medicineCategory: "",
    medicineType: "",
    manufacturer: "",
    unitPrice: 0,
    stock: 0,
  });

  /* ================= FETCH MEDICINES ================= */

  const fetchData = async () => {
    setLoading(true);
    const result = await getMedicines(token);
    setMedicines(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  /* ================= ADD MEDICINE ================= */

  const handleAddMedicine = async () => {
    try {
      await addMedicines(token, medicineForm);
      setOpened(false);
      fetchData();
      setMedicineForm({
        name: "",
        dosage: "",
        medicineCategory: "",
        medicineType: "",
        manufacturer: "",
        unitPrice: 0,
        stock: 0,
      });
    } catch {
      // handled in helper
    }
  };

  /* ================= TABLE ROWS ================= */

  const rows = medicines.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Group gap="sm">
          <IconPill size={18} />
          <Text fw={500}>{item.name}</Text>
        </Group>
      </Table.Td>

      <Table.Td>{item.dosage}</Table.Td>

      <Table.Td>
        <Badge variant="light">{item.medicineCategory}</Badge>
      </Table.Td>

      <Table.Td>{item.medicineType}</Table.Td>

      <Table.Td>{item.manufacturer}</Table.Td>

      <Table.Td>₹ {item.unitPrice}</Table.Td>

      <Table.Td>
        <Badge color={item.stock > 0 ? "green" : "red"}>
          {item.stock > 0 ? `In Stock (${item.stock})` : "Out of Stock"}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="light" color="blue">
            <IconEye size={16} />
          </ActionIcon>

          <ActionIcon variant="light" color="yellow">
            <IconEdit size={16} />
          </ActionIcon>

          <ActionIcon variant="light" color="red">
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Card shadow="md" radius="lg" p="lg">
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={700}>
            Pharmacy Inventory
          </Text>

          <Button size="sm" onClick={() => setOpened(true)}>
            Add Medicine
          </Button>
        </Group>

        {loading ? (
          <Center h={200}>
            <Loader />
          </Center>
        ) : medicines.length === 0 ? (
          <Center h={200}>
            <Text c="dimmed">No medicines available</Text>
          </Center>
        ) : (
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Dosage</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Manufacturer</Table.Th>
                <Table.Th>Unit Price</Table.Th>
                <Table.Th>Stock</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}
      </Card>

      {/* ================= ADD MEDICINE MODAL ================= */}

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Medicine"
        size="lg"
        centered
      >
        <SimpleGrid cols={2} spacing="md">
          <TextInput
            label="Medicine Name"
            required
            value={medicineForm.name}
            onChange={(e) =>
              setMedicineForm({ ...medicineForm, name: e.target.value })
            }
          />

          <TextInput
            label="Dosage"
            placeholder="500 mg"
            required
            value={medicineForm.dosage}
            onChange={(e) =>
              setMedicineForm({ ...medicineForm, dosage: e.target.value })
            }
          />

          <Select
            label="Category"
            required
            data={[
              "ANTIBIOTIC",
              "ANALGESIC",
              "ANTIPYRETIC",
              "ANTISEPTIC",
              "VITAMIN",
            ]}
            value={medicineForm.medicineCategory}
            onChange={(value) =>
              setMedicineForm({
                ...medicineForm,
                medicineCategory: value || "",
              })
            }
          />

          <Select
            label="Type"
            required
            data={["TABLET", "SYRUP", "INJECTION", "OINTMENT", "CAPSULE"]}
            value={medicineForm.medicineType}
            onChange={(value) =>
              setMedicineForm({
                ...medicineForm,
                medicineType: value || "",
              })
            }
          />

          <TextInput
            label="Manufacturer"
            required
            value={medicineForm.manufacturer}
            onChange={(e) =>
              setMedicineForm({
                ...medicineForm,
                manufacturer: e.target.value,
              })
            }
          />

          <NumberInput
            label="Unit Price"
            required
            min={0}
            value={medicineForm.unitPrice}
            onChange={(value) =>
              setMedicineForm({
                ...medicineForm,
                unitPrice: Number(value),
              })
            }
          />

          <NumberInput
            label="Stock"
            required
            min={0}
            value={medicineForm.stock}
            onChange={(value) =>
              setMedicineForm({
                ...medicineForm,
                stock: Number(value),
              })
            }
          />
        </SimpleGrid>

        <Divider my="lg" />

        <Group justify="flex-end">
          <Button variant="default" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddMedicine}>Add Medicine</Button>
        </Group>
      </Modal>
    </>
  );
};
