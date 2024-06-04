import { auth } from "@/auth";
import { cache } from "react";

export const cachedAuth = cache(auth);
