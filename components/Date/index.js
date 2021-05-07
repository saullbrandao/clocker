import format from 'date-fns/format'
import { ptBR } from 'date-fns/locale'


export const formatDate = (date, pattern) => format(date, pattern, { locale: ptBR })