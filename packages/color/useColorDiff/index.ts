import type { MaybeRefOrGetter } from 'vue-demi'
import type { DiffColorOptions } from '@vueuse/color'
import { computed, toValue } from 'vue-demi'
import { diffColor } from '@vueuse/color'

export function useColorDiff(
  value1: MaybeRefOrGetter<unknown>,
  value2: MaybeRefOrGetter<unknown>,
  options: MaybeRefOrGetter<DiffColorOptions> = {},
) {
  return computed(() => diffColor(toValue(value1), toValue(value2), toValue(options)))
}
