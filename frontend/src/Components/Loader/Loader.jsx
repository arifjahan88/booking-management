import CircularProgress from "@mui/material/CircularProgress";

export default function PageLoader() {
  return (
    <div className="flex w-full justify-center items-center md:h-40">
      <CircularProgress size={50} />
    </div>
  );
}
