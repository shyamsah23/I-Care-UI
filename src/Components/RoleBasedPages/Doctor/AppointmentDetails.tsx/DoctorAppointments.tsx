import { useEffect, useState } from "react";
import {
  Card,
  Text,
  Divider,
  Badge,
  Button,
  Group,
  Skeleton,
} from "@mantine/core";
import { motion } from "framer-motion";
import { IconCalendar, IconClock, IconUser } from "@tabler/icons-react";
import axiosInstance from "../../../../Interceptor/AxiosInterceptor";
import { useSelector } from "react-redux";
import {
  successNotification,
  errorNotification,
} from "../../../../Utility/NotificationUtility";

const DoctorAppointments = () => {
  const token = useSelector((s: any) => s.jwtSlice);
  const user = useSelector((s: any) => s.userSlice);

  const doctorId = user?.decoded?.profileId;

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await axiosInstance.get(
        `/appointment/details/doctor/${doctorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setAppointments(res.data || []);
    } catch (err) {
      console.error(err);
      errorNotification("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id: number) => {
    try {
      await axiosInstance.put(
        `/appointment/cancel/${id}`,
        { reason: "Doctor cancelled" },
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

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 via-indigo-50 to-pink-50 flex justify-center">
      <motion.div
        className="w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card shadow="xl" radius="xl" padding="xl">
          <Text fw={700} size="xl">
            Doctor Appointments
          </Text>

          <Divider my="md" />

          {/* LOADING */}
          {loading ? (
            <div className="grid md:grid-cols-3 gap-5">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} height={150} radius="lg" />
                ))}
            </div>
          ) : appointments.length === 0 ? (
            <Text c="dimmed" ta="center">
              No appointments found
            </Text>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {appointments.map((a: any) => (
                <Card
                  key={a.id}
                  shadow="sm"
                  radius="lg"
                  className="hover:shadow-lg transition"
                >
                  {/* Patient */}
                  <Group gap="xs">
                    <IconUser size={16} />
                    <Text fw={600}>Patient {a.patientId}</Text>
                  </Group>

                  {/* Date */}
                  <Group gap="xs" mt="xs">
                    <IconCalendar size={16} />
                    <Text size="sm">{a.appointmentDate}</Text>
                  </Group>

                  {/* Time */}
                  <Group gap="xs" mt="xs">
                    <IconClock size={16} />
                    <Text size="sm">
                      {a.startTime} - {a.endTime}
                    </Text>
                  </Group>

                  {/* Status */}
                  <Badge
                    mt="sm"
                    color={
                      a.status === "SCHEDULED"
                        ? "blue"
                        : a.status === "COMPLETED"
                          ? "green"
                          : "red"
                    }
                    variant="light"
                  >
                    {a.status}
                  </Badge>

                  {/* Actions */}
                  <Group mt="md">
                    {a.status === "SCHEDULED" && (
                      <Button
                        size="xs"
                        color="red"
                        fullWidth
                        onClick={() => cancelAppointment(a.id)}
                      >
                        Cancel Appointment
                      </Button>
                    )}
                  </Group>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default DoctorAppointments;
