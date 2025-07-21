import API from "./api";

export const login = async (email: string, password: string) => {
  const form = new FormData();
  form.append("username", email);
  form.append("password", password);

  const res = await API.post("/users/login", form);
  return res.data;
};
