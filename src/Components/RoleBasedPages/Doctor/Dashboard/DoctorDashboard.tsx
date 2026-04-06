import { Container, Grid, Card, Title, Text, Badge } from "@mantine/core";
import { motion } from "framer-motion";

export default function DoctorDashboard() {
  return (
    <Container size="xl" py={60}>
      <Badge variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
        Doctor Portal
      </Badge>

      <Title mt="md" fw={900}>
        Grow Your Practice 🚀
      </Title>

      <Text c="dimmed" mt="sm">
        Join a network of top-performing doctors and reach thousands of
        patients.
      </Text>

      <Grid mt="xl">
        {[
          { v: "60k+", l: "Active Patients" },
          { v: "150+", l: "Doctors Onboarded" },
          { v: "25+", l: "Specialties" },
          { v: "4.8★", l: "Avg Rating" },
        ].map((s, i) => (
          <Grid.Col key={i} span={{ base: 6, md: 3 }}>
            <Card
              component={motion.div}
              p="lg"
              radius="xl"
              shadow="md"
              whileHover={{ scale: 1.03 }}
            >
              <Title>{s.v}</Title>
              <Text c="dimmed">{s.l}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Benefits */}
      <Title order={3} mt={50}>
        Why Join Us?
      </Title>

      <Grid mt="md">
        {[
          "High Patient Reach",
          "Flexible Scheduling",
          "Digital Records",
          "Secure Payments",
        ].map((b, i) => (
          <Grid.Col key={i} span={{ base: 12, md: 3 }}>
            <Card p="lg" radius="xl" shadow="sm">
              <Text fw={600}>{b}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* CTA */}
      <Card mt={60} p="xl" radius="xl" shadow="lg">
        <Title order={3}>Start Consulting Today</Title>
        <Text c="dimmed" mt="sm">
          Expand your reach and impact more lives.
        </Text>
      </Card>
    </Container>
  );
}
