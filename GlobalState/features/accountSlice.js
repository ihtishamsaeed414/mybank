import { createSlice } from "@reduxjs/toolkit";
import { accounts } from "../../public/data/accounts";

export const accountSlice = createSlice({
  name: "users",
  initialState: {
    accounts: accounts,
  },

  reducers: {
    transaction: (state, action) => {
      const { user, reciever, a } = action.payload;
      state.accounts.forEach((acc) => {
        if (acc.owner === user.owner) {
          const mov = {
            amount: -a,
            date: new Date().toISOString(),
          };
          acc.movements.push(mov);
        } else if (acc.owner === reciever.owner) {
          const mov = {
            amount: a,
            date: new Date().toISOString(),
          };
          acc.movements.push(mov);
        }
      });
    },

    requestLoan: (state, action) => {
      const { user, amount } = action.payload;
      state.accounts.forEach((acc) => {
        if (acc.owner === user.owner) {
          const mov = {
            amount: +amount,
            date: new Date().toISOString(),
          };
          acc.movements.push(mov);
        }
      });
    },
    closeAccount: (state, action) => {
      const user = action.payload;
      const index = state.accounts.findIndex((acc) => user.owner === acc.owner);

      // deleting account
      state.accounts.splice(index, 1);
    },
  },
});

export const { transaction, requestLoan, closeAccount } = accountSlice.actions;
export default accountSlice.reducer;
