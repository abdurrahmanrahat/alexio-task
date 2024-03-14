"use server";

export const useGetUser = async () => {
  const res = await fetch(
    `https://dashboard-backend.cyclic.app/api/v1/get/user/65b3a22c01d900e96c4219ae`,
    {
      cache: "force-cache",
    }
  );
  const user = await res.json();

  return user;
};
