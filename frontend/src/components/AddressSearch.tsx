import { useEffect, useState } from 'react'
import validate from 'src/common/validation/YupAdapter'
import { Address } from 'src/interfaces/address'
import { addressService } from 'src/services/addressService'
import * as Yup from 'yup'
import { Input } from './Input'

export const validationSchema: any = {
  cep: Yup.string().required('O campo cep deve ser preenchido').length(8, 'O cep deve conter 8 caracteres').label('Cep')
}

export const AddressSearch = () => {
  const [search, setSearch] = useState<{ cep: string }>({ cep: '' })
  const [address, setAddress] = useState<Address | undefined>(undefined)
  const [errors, setErrors] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      const result = await addressService(search.cep)
      if (result.status === 200) {
        setAddress(result.data)
      } else {
        const { message } = result.data
        const errorsFound = { ...errors }
        const name = 'cep' as any
        if (message && search.cep.length === 8) {
          errorsFound[name] = message
        }
        setErrors(errorsFound)
      }
    })()
  }, [search.cep])

  async function handleChange({ currentTarget: input }: any) {
    const { name, value } = input
    search['cep'] = value

    const errorsFound = { ...errors }
    const errorMessage = await validate.One(name, value, validationSchema)

    if (errorMessage) {
      errorsFound[name] = errorMessage
    } else delete errorsFound[name]

    if (errorsFound) {
      setErrors(errorsFound)
    }
  }
  console.log(address)
  return (
    <div className="my-5">
      <Input name="cep" label="Cep" placeholder='Cep sem hífen. ex: 22220000' errors={errors} onChange={handleChange} inputvalue={search.cep} />
      <div className="my-5">
        {address &&
          Object.entries(address).map(([key, value], index) => {
            return (
              <p key={index}>
                <b>{key}: </b>
                {value}
              </p>
            )
          })}
      </div>
    </div>
  )
}
