import { Container, Grid, Card, Text, Title, Button, Group, Badge, ThemeIcon } from "@mantine/core";
import { motion } from "framer-motion";
import { IconHeartPlus, IconStethoscope, IconShieldCheck, IconArrowRight } from "@tabler/icons-react";

const MotionCard = motion(Card);

export default function HomePage() {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle at top left, #eef2ff, #f8fafc 40%, #ffffff)",
      }}
    >
      {/* Hero */}
      <Container size="xl" py={90}>
        <Grid align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Badge
              size="lg"
              radius="xl"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
            >
              Next‑Gen Digital Healthcare
            </Badge>

            <Title order={1} fw={900} mt="md" size="3.2rem">
              Healing, <span style={{ color: "#4f46e5" }}>Re‑imagined</span>
            </Title>

            <Text size="lg" mt="md" c="dimmed">
              I‑Care Hospital combines world‑class doctors, modern technology,
              and compassionate care — all in one seamless digital platform.
            </Text>

            <Group mt="xl">
              <Button
                size="lg"
                radius="xl"
                rightSection={<IconArrowRight size={18} />}
              >
                Book Appointment
              </Button>
              <Button size="lg" radius="xl" variant="light">
                Explore Services
              </Button>
            </Group>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <motion.img
              src="/hospital-hero.png"
              alt="I‑Care Hospital"
              style={{
                width: "100%",
                borderRadius: 28,
                boxShadow: "0 30px 60px rgba(0,0,0,.15)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            />
          </Grid.Col>
        </Grid>
      </Container>

      {/* Services */}
      <Container size="xl" py={70}>
        <Title order={2} ta="center" fw={800} mb={50}>
          Premium Healthcare Services
        </Title>

        <Grid>
          {[
            {
              icon: IconStethoscope,
              title: "Top Specialists",
              desc: "Highly experienced doctors across every major specialty.",
            },
            {
              icon: IconHeartPlus,
              title: "Advanced Treatments",
              desc: "Cutting‑edge diagnostics and minimally invasive procedures.",
            },
            {
              icon: IconShieldCheck,
              title: "Trusted & Secure",
              desc: "Your data and health are protected with enterprise‑grade security.",
            },
          ].map((s, i) => (
            <Grid.Col key={i} span={{ base: 12, md: 4 }}>
              <MotionCard
                p="xl"
                radius="2xl"
                shadow="xl"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <ThemeIcon
                  size={56}
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                >
                  <s.icon size={30} />
                </ThemeIcon>
                <Title order={4} mt="lg">
                  {s.title}
                </Title>
                <Text mt="sm" c="dimmed">
                  {s.desc}
                </Text>
              </MotionCard>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      {/* Stats */}
      <Container size="xl" py={60}>
        <Grid ta="center">
          {[
            { v: "120+", l: "Doctors" },
            { v: "50k+", l: "Patients" },
            { v: "25+", l: "Departments" },
          ].map((s, i) => (
            <Grid.Col key={i} span={{ base: 12, md: 4 }}>
              <Title fw={900} size="3rem" c="indigo">
                {s.v}
              </Title>
              <Text c="dimmed">{s.l}</Text>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Container size="xl" py={90}>
        <MotionCard
          radius="2xl"
          p={50}
          shadow="2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <Grid align="center">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Title order={2} fw={800}>
                Experience Healthcare Without Friction
              </Title>
              <Text mt="md" c="dimmed">
                Join thousands of patients who trust I‑Care for their health
                journey.
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} ta="right">
              <Button size="lg" radius="xl">
                Get Started
              </Button>
            </Grid.Col>
          </Grid>
        </MotionCard>
      </Container>
    </div>
  );
}
