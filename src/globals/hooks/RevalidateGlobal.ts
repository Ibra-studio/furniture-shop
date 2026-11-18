import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'
 
/**
 * Quand un Global est enregistré dans /admin, on vide la copie en cache de ce Global,
 * pour que le site affiche tout de suite la nouvelle version.
 *
 * Utilisation dans la config d'un Global :
 *   hooks: { afterChange: [revalidateGlobal('header')] }
 *
 * ⚠️ Le tag doit correspondre à celui de getCachedGlobal (src/utilities/getGlobals.ts) :
 * il doit ressembler à `global_${slug}`. Si ton revalidateTag demande un 2e argument
 * (Next 16), ajoute-le : revalidateTag(`global_${slug}`, 'max').
 */
export const revalidateGlobal =
  (slug: string): GlobalAfterChangeHook =>
  ({ doc, req: { context } }) => {
    if (!context.disableRevalidate) {
      revalidateTag(`global_${slug}` , 'max')
    }
    return doc
  }
 