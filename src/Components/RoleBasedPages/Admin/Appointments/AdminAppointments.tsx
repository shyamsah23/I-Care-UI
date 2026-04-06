import { useEffect, useState } from "react";
import {
  Card,
  Text,
  Divider,
  Badge,
  ActionIcon,
  Group,
  Skeleton,
} from "@mantine/core";
import { motion } from "framer-motion";
import {
  IconTrash,
  IconCalendar,
  IconClock,
  IconUser,
  IconUserHeart,
} from "@tabler/icons-react";
import axiosInstance from "../../../../Interceptor/AxiosInterceptor";
import { useSelector } from "react-redux";
import {
  successNotification,
  errorNotification,
} from "../../../../Utility/NotificationUtility";

const AdminAppointments = () => {
  const token = useSelector((s: any) => s.jwtSlice);

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await axiosInstance.get(
        "/appointment/details/allAppointments",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setAppointments(res.data || []);
    } catch (err) {
      errorNotification("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id: number) => {
    try {
      await axiosInstance.put(
        `/appointment/cancel/${id}`,
        { reason: "Admin cancelled" },
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
            All Appointments
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
            <Text ta="center" c="dimmed">
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
                  {/* Header */}
                  <Group justify="space-between">
                    <Text fw={600}>#{a.id}</Text>
                    <Badge
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
                  </Group>

                  {/* Doctor */}
                  <Group gap="xs" mt="sm">
                    <IconUserHeart size={16} />
                    <Text size="sm">Doctor {a.doctorId}</Text>
                  </Group>

                  {/* Patient */}
                  <Group gap="xs" mt="xs">
                    <IconUser size={16} />
                    <Text size="sm">Patient {a.patientId}</Text>
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

                  {/* Action */}
                  {a.status === "SCHEDULED" && (
                    <Group justify="flex-end" mt="md">
                      <ActionIcon
                        color="red"
                        variant="light"
                        onClick={() => cancelAppointment(a.id)}
                      >
                        <IconTrash size={18} />
                      </ActionIcon>
                    </Group>
                  )}
                </Card>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminAppointments;
