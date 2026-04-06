import {
  Container,
  Grid,
  Card,
  Text,
  Title,
  Select,
  Group,
  Badge,
} from "@mantine/core";
import {
  IconUsers,
  IconUserPlus,
  IconCurrencyRupee,
} from "@tabler/icons-react";

export default function AdminDashboard() {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle at top left, #eef2ff, #f8fafc 40%, #ffffff)",
        minHeight: "100vh",
      }}
    >
      <Container size="xl" py={{ base: 40, md: 80 }}>
        {/* Header */}
        <Group justify="space-between" mb={30}>
          <div>
            <Title fw={900}>Admin Dashboard 📊</Title>
            <Text c="dimmed">Monitor and manage platform performance</Text>
          </div>
          <Badge
            size="lg"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            Live Data
          </Badge>
        </Group>

        {/* Stats Cards */}
        <Grid>
          {[
            {
              value: "50k+",
              label: "Total Patients",
              icon: <IconUsers size={22} />,
            },
            {
              value: "120+",
              label: "Doctors",
              icon: <IconUserPlus size={22} />,
            },
            {
              value: "₹12.5L",
              label: "Sales Till Now",
              icon: <IconCurrencyRupee size={22} />,
            },
            {
              value: "15k+",
              label: "Appointments",
              icon: <IconUsers size={22} />,
            },
          ].map((item, i) => (
            <Grid.Col key={i} span={{ base: 12, sm: 6, md: 3 }}>
              <Card
                p="xl"
                radius="2xl"
                shadow="lg"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
                  color: "white",
                }}
              >
                <Group justify="space-between">{item.icon}</Group>
                <Title mt="md">{item.value}</Title>
                <Text size="sm" opacity={0.9}>
                  {item.label}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Breakdown Section */}
        <Grid mt={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card p="xl" radius="2xl" shadow="md">
              <Title order={3} mb="md">
                Doctors by Specialty
              </Title>
              <Text>Cardiologist: 30</Text>
              <Text>Dentist: 25</Text>
              <Text>Neurologist: 15</Text>
              <Text>Orthopedic: 20</Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card p="xl" radius="2xl" shadow="md">
              <Title order={3} mb="md">
                Filter by Experience
              </Title>
              <Select
                placeholder="Select experience"
                data={["0-5 years", "5-10 years", "10+ years"]}
              />
            </Card>
          </Grid.Col>
        </Grid>

        {/* Pharmacy + Revenue Insights */}
        <Grid mt={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card p="xl" radius="2xl" shadow="md">
              <Title order={3}>Pharmacy Overview</Title>
              <Text mt="md">Total Medicines: 2000+</Text>
              <Text>Low Stock Items: 120</Text>
              <Text>Out of Stock: 30</Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card
              p="xl"
              radius="2xl"
              shadow="lg"
              style={{
                background: "linear-gradient(135deg, #0f172a, #1e293b)",
                color: "white",
              }}
            >
              <Title order={3}>Revenue Insights 💰</Title>
              <Text mt="md">Monthly Revenue: ₹2.1L</Text>
              <Text>Top Department: Cardiology</Text>
              <Text>Growth: +18% this month</Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
