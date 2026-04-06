import {
  Container,
  Grid,
  Card,
  Title,
  Text,
  Badge,
  Button,
  Group,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PatientDashboard() {
  const navigate = useNavigate();
  return (
    <Container size="xl" py={60}>
      <Badge
        size="lg"
        radius="xl"
        variant="gradient"
        gradient={{ from: "teal", to: "blue" }}
      >
        Welcome Back 👋
      </Badge>

      <Title mt="md" fw={900}>
        Your Health, Our Priority
      </Title>

      <Text c="dimmed" mt="sm">
        Trusted by thousands of patients across India.
      </Text>

      {/* Stats */}
      <Grid mt="xl">
        {[
          { v: "150+", l: "Doctors" },
          { v: "60k+", l: "Patients Treated" },
          { v: "30+", l: "Cities Covered" },
          { v: "12+", l: "Specialties" },
        ].map((s, i) => (
          <Grid.Col key={i} span={{ base: 6, md: 3 }}>
            <Card component={motion.div} p="lg" radius="xl" shadow="md" whileHover={{ y: -5 }}>
              <Title>{s.v}</Title>
              <Text c="dimmed">{s.l}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Specialties */}
      <Title order={3} mt={50}>
        Our Specialists
      </Title>

      <Grid mt="md">
        {[
          "Cardiologists ❤️",
          "Dentists 🦷",
          "Dermatologists 🧴",
          "Orthopedics 🦴",
        ].map((s, i) => (
          <Grid.Col key={i} span={{ base: 12, md: 3 }}>
            <Card radius="xl" p="lg" shadow="sm">
              <Text fw={600}>{s}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* CTA */}
      <Card mt={60} p="xl" radius="xl" shadow="lg">
        <Group justify="space-between">
          <div>
            <Title order={3}>Book your next appointment</Title>
            <Text c="dimmed">Get treated by top specialists instantly</Text>
          </div>
          <Button onClick={()=>navigate('/patient/appointments')} radius="xl">Book Now</Button>
        </Group>
      </Card>
    </Container>
  );
}
