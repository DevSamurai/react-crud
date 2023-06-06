import { yupResolver } from "@hookform/resolvers/yup"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import InfoIcon from "@mui/icons-material/Info"
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
  Tooltip,
} from "@mui/material"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import InputMask from "react-input-mask"
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
    mobile: yup
      .string()
      .required("Este campo é obrigatório")
      .transform((value) =>
        value ? `+55${value.replace(/[^\d]+/g, "")}` : value
      ),
    zipCode: yup
      .string()
      .required("Este campo é obrigatório")
      .transform((value) => value.replace(/[^\d]+/g, "")),
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

  const [zipCodeFounded, setZipCodeFounded] = useState<boolean>()

  const onSubmit = (data: FormData) => console.log(data)
  const onZipCodeBlur = async (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const { value } = event.target

    if (!value) return

    const address = await findBrazilianZipCode(value)

    if (!address || !address?.addressName) {
      setZipCodeFounded(false)

      setValue("addressName", "")
      setValue("neighborhood", "")
      setValue("city", "")
      setValue("state", "")

      setFocus("addressName")

      return
    }

    setZipCodeFounded(true)

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
          <TextField
            label="Nome Completo"
            fullWidth={true}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            sx={{ marginBottom: 2 }}
            {...register("fullName")}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ marginBottom: 2 }}
          >
            <TextField
              label="E-mail"
              fullWidth={true}
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />

            <Controller
              control={control}
              name="mobile"
              defaultValue=""
              render={({ field: { ...field } }) => (
                <FormControl fullWidth={true}>
                  <InputMask mask="(99) 99999-9999" {...field}>
                    <TextField
                      label="Celular"
                      fullWidth={true}
                      error={!!errors.mobile}
                      helperText={errors.mobile?.message}
                    />
                  </InputMask>
                </FormControl>
              )}
            />
          </Stack>

          <FormTitle title="Endereço" />

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ marginBottom: 2, width: 250 }}
          >
            <Controller
              control={control}
              name="zipCode"
              defaultValue=""
              render={({ field: { ...field } }) => (
                <FormControl fullWidth={true} sx={{ width: 220 }}>
                  <InputMask
                    mask="99999-999"
                    ref={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={(e) => {
                      onZipCodeBlur(e)
                      field.onBlur()
                    }}
                  >
                    <TextField
                      label="CEP"
                      fullWidth={true}
                      error={!!errors.zipCode}
                      helperText={
                        errors.zipCode?.message ||
                        (zipCodeFounded === false &&
                          "Não encontrado, favor preencher.")
                      }
                    />
                  </InputMask>
                </FormControl>
              )}
            />
            {zipCodeFounded === true && <CheckCircleIcon color="success" />}
          </Stack>

          <Controller
            control={control}
            name="addressName"
            defaultValue=""
            render={({ field: { ...field } }) => (
              <FormControl fullWidth={true} sx={{ marginBottom: 2 }}>
                <TextField
                  label="Endereço"
                  error={!!errors.addressName}
                  helperText={errors.addressName?.message}
                  disabled={!!zipCodeFounded}
                  {...field}
                />
              </FormControl>
            )}
          />

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
            <Controller
              control={control}
              name="neighborhood"
              defaultValue=""
              render={({ field: { ...field } }) => (
                <FormControl fullWidth={true}>
                  <TextField
                    label="Bairro"
                    fullWidth={true}
                    error={!!errors.neighborhood}
                    helperText={errors.neighborhood?.message}
                    disabled={!!zipCodeFounded}
                    {...field}
                  />
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="city"
              defaultValue=""
              render={({ field: { ...field } }) => (
                <FormControl fullWidth={true}>
                  <TextField
                    label="Cidade"
                    fullWidth={true}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    disabled={!!zipCodeFounded}
                    {...field}
                  />
                </FormControl>
              )}
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
                  label="Estado"
                  labelId="state"
                  ref={field.ref}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={!!zipCodeFounded}
                >
                  <MenuItem value={""}></MenuItem>
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
              <>
                <FormControlLabel
                  control={
                    <Switch checked={value} onChange={onChange} {...field} />
                  }
                  label="Email Pré-verificado"
                  sx={{ marginBottom: 2 }}
                />
                <Tooltip title="Cadastrar o usuário sem precisar confirmar seu e-mail.">
                  <InfoIcon color="disabled" />
                </Tooltip>
              </>
            )}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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
