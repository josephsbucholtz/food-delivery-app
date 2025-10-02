import {
  PrismaClient,
  UserRole,
  ProductCategory,
  OrderStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const alice = await prisma.user.create({
    data: {
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      phoneNumber: "123-456-7890",
      role: UserRole.ADMIN,
      addresses: {
        create: [
          {
            street: "123 Main St",
            city: "Springfield",
            stateCode: "CA",
            postalCode: "90001",
            aptNumber: "1A",
          },
        ],
      },
    },
  });

  const bob = await prisma.user.create({
    data: {
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob@example.com",
      phoneNumber: "987-654-3210",
      role: UserRole.USER,
      addresses: {
        create: [
          {
            street: "456 Elm St",
            city: "Springfield",
            stateCode: "CA",
            postalCode: "90002",
          },
        ],
      },
    },
  });

  // Create Products (imageUrl is empty)
  const apple = await prisma.product.create({
    data: {
      name: "Apple",
      description: "Fresh red apples",
      category: ProductCategory.FRUIT,
      pricePerUnit: 0.99,
      weightPerUnit: 0.15,
      quantityOnHand: 100,
      imageUrl: "/images/apple.png",
    },
  });

  const milk = await prisma.product.create({
    data: {
      name: "Milk",
      description: "1L whole milk",
      category: ProductCategory.DAIRY,
      pricePerUnit: 2.49,
      weightPerUnit: 1.0,
      quantityOnHand: 50,
      imageUrl: "/images/milk.png",
    },
  });

  // Create Cart for Alice
  const aliceCart = await prisma.cart.create({
    data: {
      userId: alice.id,
      cartItems: {
        create: [
          { productId: apple.id, quantity: 3 },
          { productId: milk.id, quantity: 1 },
        ],
      },
    },
  });

  // Create an Order for Bob
  const bobOrder = await prisma.order.create({
    data: {
      userId: bob.id,
      status: OrderStatus.PENDING,
      orderItems: {
        create: [{ productId: apple.id, quantity: 5 }],
      },
    },
  });

  console.log("Seed data created:", {
    alice,
    bob,
    apple,
    milk,
    aliceCart,
    bobOrder,
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
