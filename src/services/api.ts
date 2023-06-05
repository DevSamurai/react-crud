import axios from "axios"

const api = axios.create()

export async function findBrazilianZipCode(zipCode: string): Promise<
  | {
      zipCode: string
      addressName: string
      neighborhood: string
      city: string
      state: string
    }
  | undefined
> {
  try {
    const { data } = await api.get(
      `https://viacep.com.br/ws/${zipCode.replace(/\D/g, "")}/json/`
    )

    return {
      zipCode: data.cep,
      addressName: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    }
  } catch (error) {
    console.error(error)
    return
  }
}
