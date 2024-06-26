import { BedroomBabyOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../../../services/Auth";
import { IUser, userRegisterDTO } from "../../../interfaces/userInterfaces";
import authStore from "../../../stores/AuthStore";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const { setTokens, setUser } = authStore();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const handleRegistration = (data: FieldValues) => {
    authServices
      .register(data as userRegisterDTO)
      .then((res) => {
        //set tokens in authStore
        setTokens({
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token,
        });
        //decode accesstoken to user
        const decodedUser = jwtDecode(res.data.access_token) as IUser;
        setUser(decodedUser);
        navigate("/");
        toast.success(`hello, ${decodedUser.first_name}!`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container
      component={Paper}
      maxWidth="xs"
      sx={{
        bgcolor: "primary.light",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 1,
        mt: 3,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <BedroomBabyOutlined sx={{ color: "black" }} />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(handleRegistration)}
        noValidate
        sx={{
          mt: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <TextField
          size="small"
          margin="normal"
          label="FirstName"
          autoFocus
          {...register("first_name", { required: "first name is required" })}
          error={!!errors.first_name}
          helperText={errors?.first_name?.message as string}
        />
        <TextField
          size="small"
          margin="normal"
          label="LastName"
          {...register("last_name", { required: "last name is required" })}
          error={!!errors.last_name}
          helperText={errors?.last_name?.message as string}
        />
        <TextField
          size="small"
          margin="normal"
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
              message: "Not a validemail address",
            },
          })}
          error={!!errors.email}
          helperText={errors?.email?.message as string}
        />
        <TextField
          size="small"
          margin="normal"
          label="Password"
          type="password"
          {...register("password", {
            required: "password is required",
            pattern: {
              value:
                /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
              message: "the password does not meet the complexity requirments",
            },
          })}
          error={!!errors.password}
          helperText={errors?.password?.message as string}
        />
        <TextField
          size="small"
          margin="normal"
          label="Phone"
          type="numbe"
          {...register("phone_number", {
            required: "phone number is required",
            pattern: {
              value: /\d{7,}/,
              message: "the number should be at least 7 digits",
            },
          })}
          error={!!errors.phone_number}
          helperText={errors?.phone_number?.message as string}
        />
        <LoadingButton
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item color={"info.main"}>
            <Link
              to="/auth"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {"Already have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
