export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-gradient": "linear-gradient(180deg, rgba(20,20,20,0.05) 0%, rgba(20,20,20,0.96) 80%)",
      },
      boxShadow: {
        netflix: "0 20px 60px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};
