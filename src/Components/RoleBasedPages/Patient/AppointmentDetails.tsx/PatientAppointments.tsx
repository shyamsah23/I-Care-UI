import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Divider,
  Button,
  Modal,
  TextInput,
  Group,
  Skeleton,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { motion } from "framer-motion";
import {
  IconCalendar,
  IconClock,
  IconUser,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../../Interceptor/AxiosInterceptor";
import { useNavigate } from "react-router-dom";
import { getProfileData, GetProfileDataByEmail } from "../../../../Services/ProfileService";
import { errorNotification, successNotification } from "../../../../Utility/NotificationUtility";

const PatientAppointments = () => {
  const token = useSelector((state: any) => state.jwtSlice);
  const user = useSelector((state: any) => state.userSlice);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const [appointmentData, setAppointmentData] = useState({
    appointmentDate: "",
    reason: "",
  });

  const fetchAppointments = async () => {
    try {
      const res = await axiosInstance.get(
        `/appointment/details/patient/${user?.decoded?.profileId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setAppointments(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  
  const searchDoctor = async () => {
    try {
      const res = await GetProfileDataByEmail(doctorEmail, "doctor", token);
      setDoctorId(res.id);
      successNotification("Doctor with given email found");
    }
    catch (err) { errorNotification("No doctor Found") };
  };

  const fetchSlots = async (date: string) => {
    try {
      const res = await axiosInstance.get(
        `/appointment/slots?doctorId=${doctorId}&date=${date}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSlots(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const scheduleAppointment = () => {
    if (!selectedSlot) {
      alert("Please select a slot");
      return;
    }

    navigate("/patient/payment", {
      state: {
        paymentType: "APPOINTMENT",
        appointmentData: {
          doctorId,
          patientId: user?.decoded?.profileId,
          appointmentDate: appointmentData.appointmentDate,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          reason: appointmentData.reason,
        },
      },
    });
  };

  const cancelAppointment = async (id: number) => {
    try {
      await axiosInstance.put(
        `/appointment/cancel/${id}`,
        { reason: "User cancelled" },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      successNotification("Appointment cancelled");
      fetchAppointments();
    } catch (err) {
      errorNotification("Cancel failed");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    setSlots([]);
    setSelectedSlot(null);
  }, [doctorId]);
  
  const isBooked = (slotTime: string) => {
    return appointments.some(
      (a: any) => a.startTime === slotTime && a.status === "SCHEDULED",
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 via-indigo-50 to-pink-50 flex justify-center">
      <motion.div className="w-full max-w-6xl">
        <Card shadow="xl" radius="xl" padding="xl">
          <div className="flex justify-between">
            <Text fw={700} size="xl">
              My Appointments
            </Text>
            <Button
              onClick={() => setOpened(true)}
              leftSection={<IconPlus size={18} />}
            >
              Book Appointment
            </Button>
          </div>

          <Divider my="md" />

          <div className="grid md:grid-cols-3 gap-5">
            {appointments.map((a) => (
              <Card key={a.id}>
                <Text fw={600}>Doctor {a.doctorId}</Text>
                <Text size="sm">{a.appointmentDate}</Text>
                <Text size="xs" c="dimmed">
                  {a.status === "CANCELLED" && a.refunded
                    ? "Refund processed"
                    : a.status === "CANCELLED"
                      ? "No refund"
                      : ""}
                </Text>
                <Text size="sm">
                  {a.startTime} - {a.endTime}
                </Text>
                <Badge>{a.status}</Badge>
                <Group mt="sm">
                  <Button
                    size="xs"
                    color="red"
                    onClick={() => cancelAppointment(a.id)}
                  >
                    Cancel
                  </Button>
                </Group>
              </Card>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* MODAL */}
      <Modal opened={opened} onClose={() => setOpened(false)} centered>
        <Text fw={700}>Book Appointment</Text>

        <TextInput
          label="Doctor Email"
          value={doctorEmail}
          onChange={(e) => setDoctorEmail(e.target.value)}
        />
        <Button mt="xs" onClick={searchDoctor}>
          Search
        </Button>

        <TextInput
          type="date"
          label="Date"
          value={appointmentData.appointmentDate}
          onChange={(e) => {
            const d = e.target.value;
            setAppointmentData({ ...appointmentData, appointmentDate: d });
            if (doctorId) fetchSlots(d);
          }}
        />

        {/* SLOT GRID */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          {slots.map((s, i) => (
            <button
              key={i}
              disabled={isBooked(s.time)}
              onClick={() => setSelectedSlot(s)}
              className={`p-2 rounded text-white ${
                s.booked ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {s.startTime}
            </button>
          ))}
        </div>

        <TextInput
          label="Reason"
          value={appointmentData.reason}
          onChange={(e) =>
            setAppointmentData({ ...appointmentData, reason: e.target.value })
          }
        />

        <Group mt="md">
          <Button onClick={scheduleAppointment}>Confirm</Button>
        </Group>
      </Modal>
    </div>
  );
};

export default PatientAppointments;
