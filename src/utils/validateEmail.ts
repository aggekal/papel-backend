export const validateUOPmail = (email: string): boolean => {
  return (
    (email.endsWith("@uop.gr") && !email.endsWith("@go.uop.gr")) ||
    (!email.endsWith("@uop.gr") && email.endsWith("@go.uop.gr"))
  );
};
