import {
  Card,
  Text,
  Group,
  Button,
  NumberInput,
  Table,
  Badge,
} from "@mantine/core";
import { removeFromCart, updateQuantity } from "../../Slices/CartSlice";
import { useNavigate } from "react-router-dom";
import { errorNotification } from "../../Utility/NotificationUtility";
import { useDispatch, useSelector } from "react-redux";

export const Cart = () => {
  const cart = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MAX_PER_USER = 10;

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.unitPrice * item.quantity,
    0,
  );

  const handleQuantityChange = (item: any, value: number) => {
    if (value <= 0) return;

    if (value > item.stock) {
      errorNotification("Exceeds available stock");
      return;
    }

    if (value > MAX_PER_USER) {
      errorNotification("Max 10 units allowed");
      return;
    }

    dispatch(
      updateQuantity({
        id: item.id,
        quantity: value,
      }),
    );
  };

  return (
    <Card shadow="md" p="lg">
      <Text fw={700} size="lg" mb="md">
        Your Cart
      </Text>

      {cart.length === 0 ? (
        <Text c="dimmed">Cart is empty</Text>
      ) : (
        <>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Medicine</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Stock</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {cart.map((item: any) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.name}</Table.Td>

                  <Table.Td>₹ {item.unitPrice}</Table.Td>

                  <Table.Td>
                    <Badge color={item.stock > 0 ? "green" : "red"}>
                      {item.stock}
                    </Badge>
                  </Table.Td>

                  <Table.Td>
                    <NumberInput
                      min={1}
                      max={Math.min(item.stock, 10)}
                      value={item.quantity}
                      onChange={(val) =>
                        handleQuantityChange(item, Number(val))
                      }
                    />
                  </Table.Td>

                  <Table.Td>₹ {item.unitPrice * item.quantity}</Table.Td>

                  <Table.Td>
                    <Button
                      color="red"
                      size="xs"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          <Group justify="space-between" mt="lg">
            <Text fw={700} size="lg">
              Total: ₹ {total}
            </Text>

            <Button
              disabled={cart.length === 0}
              onClick={() => navigate("/patient/payment")}
            >
              Proceed to Payment
            </Button>
          </Group>
        </>
      )}
    </Card>
  );
};
