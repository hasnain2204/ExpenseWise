import { Users, User, DollarSign, Calendar, Smartphone, Film, ShoppingCart, Coffee, Home } from "lucide-react";
import avatar1 from "@assets/generated_images/3d_friendly_avatar_of_a_smiling_young_woman.png";
import avatar2 from "@assets/generated_images/3d_friendly_avatar_of_a_smiling_young_man_with_glasses.png";
import avatar3 from "@assets/generated_images/3d_friendly_avatar_of_a_person_with_beanie.png";
import groupIcon from "@assets/generated_images/abstract_geometric_shape_for_group_icon.png";

export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "PHP", symbol: "₱", name: "Philippine Peso" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
];

export const CURRENT_USER = {
  id: "u1",
  name: "Alex",
  email: "alex@example.com",
  avatar: avatar2,
  balance: 450.50, // Positive means owed, negative means owes
  currency: "USD",
};

export const FRIENDS = [
  { id: "u2", name: "Sarah", email: "sarah@example.com", avatar: avatar1, balance: 120.00, currency: "USD" },
  { id: "u3", name: "Mike", email: "mike@example.com", avatar: avatar3, balance: -50.25, currency: "USD" },
  { id: "u4", name: "Emma", email: "emma@example.com", avatar: null, balance: 0, currency: "USD" },
];

export const GROUPS = [
  { id: "g1", name: "Apartment 404", members: ["u1", "u2", "u3"], image: groupIcon, type: "Home" },
  { id: "g2", name: "Hawaii Trip", members: ["u1", "u4"], image: null, type: "Trip" },
];

export const EXPENSES = [
  {
    id: "e1",
    description: "Weekly Groceries",
    amount: 156.32,
    payerId: "u1",
    date: "2024-05-10T14:30:00",
    group: "Apartment 404",
    category: "Groceries",
    split: "Equal",
    involved: ["u1", "u2", "u3"],
    currency: "USD",
  },
  {
    id: "e2",
    description: "Internet Bill",
    amount: 89.99,
    payerId: "u2",
    date: "2024-05-08T09:00:00",
    group: "Apartment 404",
    category: "Utilities",
    split: "Equal",
    involved: ["u1", "u2", "u3"],
    currency: "USD",
  },
  {
    id: "e3",
    description: "Dinner at Mario's",
    amount: 120.50,
    payerId: "u1",
    date: "2024-05-05T20:00:00",
    group: null,
    category: "Food",
    split: "You owed full",
    involved: ["u1", "u3"],
    currency: "USD",
  },
  {
    id: "e4",
    description: "Movie Tickets",
    amount: 45.00,
    payerId: "u3",
    date: "2024-05-01T18:30:00",
    group: null,
    category: "Entertainment",
    split: "Equal",
    involved: ["u1", "u3"],
    currency: "USD",
  },
];

export const CATEGORY_ICONS: Record<string, any> = {
  Groceries: ShoppingCart,
  Utilities: Home,
  Food: Coffee,
  Entertainment: Film,
  Trip: Calendar,
  Other: DollarSign,
};

export function formatCurrency(amount: number, currencyCode: string = "USD") {
  const currency = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
  return `${currency.symbol}${Math.abs(amount).toFixed(2)}`;
}
