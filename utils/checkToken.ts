interface RoleType {
  id: string;
  name: string;
}
export const checkAdmin = (roleArray: RoleType[] | undefined) => {
  if (!roleArray) {
    return false;
  }
  const adminExist = roleArray.find((item) => item.name === "ROLE_ADMIN");
  if (adminExist) {
    return true;
  }
  return false;
};
