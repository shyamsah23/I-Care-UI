import { Card, Text, ScrollArea, Button, Group, Badge } from "@mantine/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotifications } from "../../Slices/NotificationSlice";

export default function NotificationPanel() {
  const [expanded, setExpanded] = useState(false);
  const notifications = useSelector((state: any) => state.notifications);
  const dispatch = useDispatch();

  const visibleNotifications = expanded
    ? notifications
    : notifications.slice(0, 10);

  return (
    <Card
      shadow="lg"
      radius="xl"
      className="
        w-80 md:w-96
        bg-slate-900/95 backdrop-blur-xl
        border border-emerald-500/30
        text-white
      "
    >
      {/* Header */}
      <Group justify="space-between" mb="sm">
        <Text fw={600}>Notifications</Text>
        <Badge color="teal" variant="light">
          {notifications.length}
        </Badge>
      </Group>

      {/* Empty */}
      {notifications.length === 0 && (
        <Text c="dimmed" size="sm">
          No notifications yet
        </Text>
      )}

      {/* List */}
      <ScrollArea h={300}>
        <div className="flex flex-col gap-2">
          {visibleNotifications.map((n: any) => (
            <Card
              key={n.id}
              p="sm"
              radius="lg"
              className="
                bg-white/5
                border border-white/10
                hover:bg-emerald-500/10
                transition-all duration-200
                relative
              "
            >
              {/* subtle left accent (VERY LIGHT) */}
              <div
                className={`
                  absolute left-0 top-0 bottom-0 w-1 rounded-l-lg
                  ${
                    n.type === "error"
                      ? "bg-red-400/40"
                      : n.type === "success"
                        ? "bg-emerald-400/40"
                        : "bg-blue-400/40"
                  }
                `}
              />

              <Text size="sm" ml={6}>
                {n.message}
              </Text>
              <Text size="xs" c="dimmed" ml={6}>
                {n.time}
              </Text>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="flex gap-2 mt-3">
        {notifications.length > 10 && (
          <Button
            fullWidth
            variant="light"
            color="teal"
            radius="xl"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show Less" : "View All"}
          </Button>
        )}

        {notifications.length > 0 && (
          <Button
            fullWidth
            variant="subtle"
            color="red"
            radius="xl"
            onClick={() => dispatch(clearNotifications())}
          >
            Clear All
          </Button>
        )}
      </div>
    </Card>
  );
}
