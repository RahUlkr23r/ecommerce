import { Divider, Box, Typography, Paper } from "@mui/material";
import { useAppSelector } from "../../../State/Store";
import { AccountCircle, Email, Phone, Badge } from "@mui/icons-material";
import ProfileFieldCard from "../../../Component/ProfileFieldCard";

const UserDetails = () => {
  const { auth } = useAppSelector((store) => store);

  const details = [
    { label: "Name", value: auth.user?.fullname || "N/A", icon: <AccountCircle fontSize="small" /> },
    { label: "Email", value: auth.user?.email || "N/A", icon: <Email fontSize="small" /> },
    { label: "Mobile", value: auth.user?.mobile || "N/A", icon: <Phone fontSize="small" /> },
    { label: "Role", value: auth.user?.role || "N/A", icon: <Badge fontSize="small" /> },
  ];

  return (
    <Box className="flex justify-center py-10 bg-gray-50 min-h-screen">
      <Paper elevation={3} className="w-full lg:w-[60%] p-6 rounded-xl">
        <Typography variant="h5" fontWeight={600} className="text-gray-700 pb-4 border-b">
          Personal Information
        </Typography>

        <Box className="mt-6 space-y-6">
          {details.map((item, index) => (
            <Box key={item.label}>
              <Typography variant="caption" className="text-gray-500 mb-1 flex items-center gap-2">
                {item.icon}
                {item.label}
              </Typography>
              <ProfileFieldCard value={item.value} key={""} />
              {index < details.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default UserDetails;
