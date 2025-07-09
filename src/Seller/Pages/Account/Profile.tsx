import React, { useEffect, useState } from "react";
import {
  Card, CardContent, Typography, Avatar, Grid, Button,
  Divider, 
  Chip, Box, CircularProgress
} from "@mui/material";
import {
  Edit, Check, Close, Person, Business, LocationOn, AccountBalance, CameraAlt
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerProfile } from "../../../State/Sellers/sellerSlice";

const ProfileCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.12)"
  }
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  "& .MuiTypography-h6": {
    fontWeight: 600,
    color: theme.palette.primary.main
  }
}));

const DetailItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
  "& .label": {
    minWidth: "140px",
    color: theme.palette.text.secondary
  },
  "& .value": {
    flex: 1,
    wordBreak: "break-word"
  }
}));

const Profile = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.seller);
  const jwt = localStorage.getItem("jwt");

  const [editSection, setEditSection] = useState<string | null>(null);
  const [tempData, setTempData] = useState<any>({});

  useEffect(() => {
    if (jwt) {
      dispatch(fetchSellerProfile(jwt));
    }
  }, [dispatch, jwt]);

  const handleEditClick = (section: string) => {
    if (!profile) return;
    setEditSection(section);
    setTempData({ ...profile[section as keyof typeof profile] });
  };

  const handleCancelEdit = () => {
    setEditSection(null);
    setTempData({});
  };

  const handleSaveEdit = () => {
    setEditSection(null);
    // 🔁 Optionally send updated data to backend here
  };

  const handleChange = (field: string, value: string) => {
    setTempData({
      ...tempData,
      [field]: value
    });
  };

  if (loading) return <Box textAlign="center" mt={5}><CircularProgress /></Box>;
  if (error) return <Box textAlign="center" mt={5}><Typography color="error">{error.message}</Typography></Box>;
  if (!profile) return null;

  const renderSection = (title: string, section: string, icon: React.ReactNode, content: React.ReactNode) => (
    <ProfileCard>
      <CardContent>
        <SectionHeader>
          <Box display="flex" alignItems="center" gap={1}>
            {icon}
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Button
            startIcon={<Edit />}
            onClick={() => handleEditClick(section)}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ borderRadius: "8px" }}
          >
            Edit
          </Button>
        </SectionHeader>
        <Divider sx={{ mb: 2 }} />
        {content}
      </CardContent>
    </ProfileCard>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "1200px", mx: "auto", "& > *": { mb: 3 } }}>
      {/* PERSONAL */}
      {renderSection("Personal Info", "personal", <Person color="primary" />, (
        <Grid container spacing={2}>
          <Grid >
            <Avatar
              src={profile?.businessDetails?.logo || ""}
              alt="Logo"
              sx={{ width: 100, height: 100, mx: "auto" }}
            />
          </Grid>
          <Grid>
            <DetailItem><Typography className="label">Seller Name:</Typography><Typography className="value">{profile.sellerName}</Typography></DetailItem>
            <DetailItem><Typography className="label">Email:</Typography><Typography className="value">{profile.email}</Typography></DetailItem>
            <DetailItem><Typography className="label">Mobile:</Typography><Typography className="value">{profile.mobile}</Typography></DetailItem>
                        <DetailItem><Typography className="label">GST:</Typography><Typography className="value">{profile.gstIn}</Typography></DetailItem>
            <DetailItem><Typography className="label">Account Status:</Typography><Chip label={profile.accountStatus} color={profile.accountStatus === "VERIFIED" ? "success" : "warning"} /></DetailItem>
          </Grid>
        </Grid>
      ))}

      {/* BUSINESS */}
      {renderSection("Business Details", "businessDetails", <Business color="primary" />, (
        <>
          <DetailItem><Typography className="label">Business Name:</Typography><Typography className="value">{profile.businessDetails?.bussinessName}</Typography></DetailItem>
          <DetailItem><Typography className="label">Business Email:</Typography><Typography className="value">{profile.businessDetails?.bussinessEmail}</Typography></DetailItem>
          <DetailItem><Typography className="label">Business Mobile:</Typography><Typography className="value">{profile.businessDetails?.bussinessMobile}</Typography></DetailItem>
          <DetailItem><Typography className="label">Business Address:</Typography><Typography className="value">{profile.businessDetails?.bussinessAddress}</Typography></DetailItem>
          <DetailItem><Typography className="label">Banner:</Typography><img src={profile.businessDetails?.banner} alt="Banner" width={100} style={{ borderRadius: "8px" }} /></DetailItem>
        </>
      ))}

      {/* PICKUP */}
      {renderSection("Pickup Address", "pickupAddress", <LocationOn color="primary" />, (
        <>
          <DetailItem><Typography className="label">Name:</Typography><Typography className="value">{profile.pickupAddress?.name || "-"}</Typography></DetailItem>
          <DetailItem><Typography className="label">City:</Typography><Typography className="value">{profile.pickupAddress?.city}</Typography></DetailItem>
          <DetailItem><Typography className="label">State:</Typography><Typography className="value">{profile.pickupAddress?.state}</Typography></DetailItem>
          <DetailItem><Typography className="label">Pincode:</Typography><Typography className="value">{profile.pickupAddress?.pincode || "-"}</Typography></DetailItem>
        </>
      ))}

      {/* BANK */}
      {renderSection("Bank Details", "bankDetails", <AccountBalance color="primary" />, (
        <>
          {profile.bankDetails ? (
            <>
              <DetailItem><Typography className="label">Account Holder:</Typography><Typography className="value">{profile.bankDetails?.holderName}</Typography></DetailItem>
              <DetailItem><Typography className="label">Account Number:</Typography><Typography className="value">{profile.bankDetails?.accountNumber}</Typography></DetailItem>
              <DetailItem><Typography className="label">IFSC Code:</Typography><Typography className="value">{profile.bankDetails?.ifsc}</Typography></DetailItem>
            </>
          ) : (
            <Typography color="textSecondary">No bank details available</Typography>
          )}
        </>
      ))}
    </Box>
  );
};

export default Profile;
