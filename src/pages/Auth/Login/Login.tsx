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
import { CowboyHatIcon } from "hugeicons-react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authServices from "../../../services/Auth";
import { toast } from "react-toastify";
import authStore from "../../../stores/AuthStore";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../../../interfaces/userInterfaces";

export default function Login() {
  const navigate = useNavigate();
  const loc = useLocation();
  const { setTokens, setUser } = authStore();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const submitForm = (data: FieldValues) => {
    authServices
      .login({ email: data.email, password: data.password })
      .then((res) => {
        //set tokens in authStore
        setTokens({
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token,
        });
        //decode accesstoken to user
        const decodedUser = jwtDecode(res.data.access_token) as IUser;
        setUser(decodedUser);
        if (loc.pathname.includes("/auth")) navigate("/");
        else location.reload();
        toast.success(`hello ${decodedUser.first_name}`);
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
      <Avatar sx={{ m: 1, bgcolor: "primary.main", objectFit: "contain" }}>
        <CowboyHatIcon size={24} color={"#000"} />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(submitForm)}
        noValidate
        sx={{
          mt: 1,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <TextField
          margin="normal"
          size="small"
          fullWidth
          label="Email"
          autoFocus
          {...register("email", {
            required: "email is required",
          })}
          error={!!errors.email}
          helperText={errors?.email?.message as string}
        />
        <TextField
          margin="normal"
          size="small"
          fullWidth
          label="Password"
          type="password"
          {...register("password", { required: "password is required" })}
          error={!!errors.password}
          helperText={errors?.password?.message as string}
        />
        <LoadingButton
          loading={isSubmitting}
          disabled={!isValid}
          size="small"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="primary"
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item color={"info.main"}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/auth/register"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
