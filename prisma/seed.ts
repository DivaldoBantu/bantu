import { seedAccounts } from './seeds/account.seed'
import { seedClasse } from './seeds/class.seed'
import { seedClient } from './seeds/client.seed'
import { SeedCountries } from './seeds/country.seed'
import { seedFornecedor } from './seeds/fornecedor.seed'
import { seedImpost } from './seeds/impost-type.seed'
import { seedRolePermissions } from './seeds/roles.seed'
import { seedSubContas } from './seeds/sub-conta.seed'
import { seedUsers } from './seeds/users.seed'

async function seed() {
  await SeedCountries()
  await seedRolePermissions()
  await seedImpost()
  await seedUsers()
  await seedClasse()
  await seedAccounts()
  await seedSubContas()
  await seedClient()
  await seedFornecedor()
}

await seed().then(() => {
  console.log('database seeded with success')
  process.exit(0)
})
