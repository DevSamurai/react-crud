import { yupResolver } from "@hookform/resolvers/yup"
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Link as RouterLink } from "react-router-dom"
import * as yup from "yup"

import Breadcrumbs from "../../../components/Breadcrumbs"
import FormTitle from "../../../components/FormTitle"
import PageTitle from "../../../components/PageTitle"

import { findBrazilianZipCode } from "../../../services/api"

const schema = yup
  .object({
    fullName: yup.string().required("Este campo é obrigatório"),
    email: yup
      .string()
      .email("E-mail não reconhecido")
      .required("Este campo é obrigatório"),
    emailVerified: yup.boolean().default(false),
    mobile: yup.string().required("Este campo é obrigatório"),
    zipCode: yup.string().required("Este campo é obrigatório"),
    addressName: yup.string().required("Este campo é obrigatório"),
    number: yup.string().required("Este campo é obrigatório"),
    complement: yup.string(),
    neighborhood: yup.string().required("Este campo é obrigatório"),
    city: yup.string().required("Este campo é obrigatório"),
    state: yup.string().required("Este campo é obrigatório"),
    // role: yup
    //   .string()
    //   .required("Este campo é obrigatório")
    //   .oneOf(["admin", "user"], "Valor inválido"),
  })
  .required()
type FormData = yup.InferType<typeof schema>

export default function Create() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const [addressLoaded, setAddressLoaded] = useState(false)
  const [zipCodeFounded, setZipCodeFounded] = useState(true)
  const [address, setAddress] = useState({
    addressName: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  } as FormData)

  const onSubmit = (data: FormData) => console.log(data)

  const onZipCodeBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target

    setZipCodeFounded(true)

    if (!value) return

    const address = await findBrazilianZipCode(value)

    if (!address) {
      setAddressLoaded(true)
      setZipCodeFounded(false)
      setFocus("addressName")
      return
    }

    // set the values on the state
    setAddress(address as FormData)

    // set the values on the form
    setValue("addressName", address.addressName)
    setValue("neighborhood", address.neighborhood)
    setValue("city", address.city)
    setValue("state", address.state)

    setFocus("number")
  }

  return (
    <>
      <Stack sx={{ marginBottom: 2 }}>
        <PageTitle title="Criar Novo Usuário" />
        <Breadcrumbs
          path={[{ label: "Usuários", to: "/users/" }, { label: "Novo" }]}
        />
      </Stack>
      <Paper>
        <Box
          component="form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ p: 2 }}
        >
          <Stack sx={{ marginBottom: 2 }}>
            <TextField
              label="Nome Completo"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              {...register("fullName")}
            />
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{ marginBottom: 2 }}
            spacing={2}
          >
            <TextField
              label="E-mail"
              fullWidth={true}
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />

            <TextField
              label="Celular"
              fullWidth={true}
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
              {...register("mobile")}
            />
          </Stack>

          <FormTitle title="Endereço" />

          <Stack sx={{ marginBottom: 2, width: 200 }}>
            <TextField
              fullWidth={false}
              label="CEP"
              error={!!errors.zipCode}
              helperText={
                errors.zipCode?.message ||
                (!zipCodeFounded && "Não encontrado, preencha.")
              }
              {...register("zipCode")}
              onBlur={onZipCodeBlur}
            />
          </Stack>

          <Stack sx={{ marginBottom: 2 }}>
            <TextField
              label="Endereço"
              error={!!errors.addressName}
              helperText={errors.addressName?.message}
              disabled={!addressLoaded}
              value={address.addressName}
              {...register("addressName")}
            />
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{ marginBottom: 2 }}
            spacing={2}
          >
            <TextField
              label="Número"
              fullWidth={true}
              error={!!errors.number}
              helperText={errors.number?.message}
              {...register("number")}
            />
            <TextField
              label="Complemento"
              fullWidth={true}
              error={!!errors.complement}
              helperText={errors.complement?.message}
              {...register("complement")}
            />
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{ marginBottom: 2 }}
            spacing={2}
          >
            <TextField
              label="Bairro"
              fullWidth={true}
              error={!!errors.neighborhood}
              helperText={errors.neighborhood?.message}
              disabled={!addressLoaded}
              value={address.neighborhood}
              {...register("neighborhood")}
            />
            <TextField
              label="Cidade"
              fullWidth={true}
              error={!!errors.city}
              helperText={errors.city?.message}
              disabled={!addressLoaded}
              value={address.city}
              {...register("city")}
            />
          </Stack>

          <Controller
            control={control}
            name="state"
            defaultValue=""
            render={({ field: { ...field } }) => (
              <FormControl fullWidth={true} sx={{ marginBottom: 2 }}>
                <InputLabel id="state">Estado</InputLabel>
                <Select
                  labelId="state"
                  label="Estado"
                  ref={field.ref}
                  name={field.name}
                  value={address.state || field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={!addressLoaded}
                >
                  <MenuItem value={"AC"}>Acre</MenuItem>
                  <MenuItem value={"AL"}>Alagoas</MenuItem>
                  <MenuItem value={"AP"}>Amapá</MenuItem>
                  <MenuItem value={"AM"}>Amazonas</MenuItem>
                  <MenuItem value={"BA"}>Bahia</MenuItem>
                  <MenuItem value={"CE"}>Ceará</MenuItem>
                  <MenuItem value={"ES"}>Espírito Santo</MenuItem>
                  <MenuItem value={"DF"}>Distrito Federal</MenuItem>
                  <MenuItem value={"GO"}>Goiás</MenuItem>
                  <MenuItem value={"MA"}>Maranhão</MenuItem>
                  <MenuItem value={"MT"}>Mato Grosso</MenuItem>
                  <MenuItem value={"MS"}>Mato Grosso do Sul</MenuItem>
                  <MenuItem value={"MG"}>Minas Gerais</MenuItem>
                  <MenuItem value={"PA"}>Pará</MenuItem>
                  <MenuItem value={"PB"}>Paraíba</MenuItem>
                  <MenuItem value={"PR"}>Paraná</MenuItem>
                  <MenuItem value={"PE"}>Pernambuco</MenuItem>
                  <MenuItem value={"PI"}>Piauí</MenuItem>
                  <MenuItem value={"RJ"}>Rio de Janeiro</MenuItem>
                  <MenuItem value={"RN"}>Rio Grande do Norte</MenuItem>
                  <MenuItem value={"RS"}>Rio Grande do Sul</MenuItem>
                  <MenuItem value={"RO"}>Rondônia</MenuItem>
                  <MenuItem value={"RR"}>Roraima</MenuItem>
                  <MenuItem value={"SC"}>Santa Catarina</MenuItem>
                  <MenuItem value={"SP"}>São Paulo</MenuItem>
                  <MenuItem value={"SE"}>Sergipe</MenuItem>
                  <MenuItem value={"TO"}>Tocantins</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="emailVerified"
            defaultValue={false}
            render={({ field: { onChange, value, ...field } }) => (
              <FormControlLabel
                control={
                  <Switch onChange={onChange} checked={value} {...field} />
                }
                label="Email Pré-verificado"
                sx={{ marginBottom: 2 }}
              />
            )}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{ marginBottom: 2 }}
            spacing={2}
          >
            <Button type="submit" variant="contained" size="large">
              Criar Usuário
            </Button>
            <Button component={RouterLink} to="/users">
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Paper>
    </>
  )
}
