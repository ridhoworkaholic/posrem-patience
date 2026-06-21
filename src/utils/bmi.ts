export const getBmiStyle = (bmiDesc: string) => {
  switch (bmiDesc?.toLowerCase()) {
    case "underweight":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
      };

    case "normal":
      return {
        bg: "bg-green-100",
        text: "text-green-800",
      };

    case "overweight":
      return {
        bg: "bg-orange-100",
        text: "text-orange-800",
      };

    case "obese":
      return {
        bg: "bg-red-100",
        text: "text-red-800",
      };

    default:
      return {
        bg: "bg-slate-100",
        text: "text-slate-800",
      };
  }
};
