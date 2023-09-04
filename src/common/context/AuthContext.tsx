import React from "react";
import { IUser } from "common/types";

export const AuthContext = React.createContext<IUser | null>(null);
