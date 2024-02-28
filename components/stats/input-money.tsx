'use client'
import React, { useContext } from 'react'

import { LoadingSpinner } from '@/app/icons'
import supabaseClient from '@/lib/supabaseClient'
import { useAuth } from '@clerk/nextjs'
import {
  Button,
  Card,
  DatePicker,
  DatePickerValue,
  Legend,
  NumberInput,
  Title,
} from '@tremor/react'
import { Euro } from 'lucide-react'
import { redirect } from 'next/navigation'
import { StatsContext } from '.'

export default function InputMoney() {
  const { getToken, userId } = useAuth()

  if (!userId) {
    redirect('/')
  }
  const { isLoading, lastOccurence, refreshMoney } = useContext(StatsContext)

  const _inputRef = React.useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = React.useTransition()
  const [date, setDate] = React.useState(new Date())
  const [amount, setAmount] = React.useState<number>(0)

  const onDateChange = (date: DatePickerValue) => {
    setDate(date as Date)
  }
  const midnight = new Date()
  midnight.setHours(0, 0, 0, 0)

  const sendData = async () =>
    startTransition(async () => {
      const token = await getToken({ template: 'supabase' })
      const supabase = await supabaseClient(token as string)

      const { error } = await supabase.from('money').insert({
        user_id: userId,
        value: amount,
        created_at: date,
      })

      if (error) {
        console.error('error', error)
      } else {
        setAmount(0)
        _inputRef.current && (_inputRef.current.value = '')
        refreshMoney()
      }
    })

  return (
    <Card
      decoration="top"
      decorationColor={isLoading ? 'slate' : lastOccurence ? 'emerald' : 'red'}
    >
      <Title>Add daily value</Title>
      {!isLoading && (
        <Legend
          className="mt-3"
          categories={[
            lastOccurence
              ? `Added today ${new Date(
                  lastOccurence.created_at
                ).toLocaleTimeString('en-us', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}`
              : 'No value added today',
          ]}
          colors={[lastOccurence ? 'emerald' : 'red']}
        />
      )}
      <DatePicker
        className="mt-3"
        value={date}
        onValueChange={onDateChange}
        maxDate={new Date()}
        enableClear={false}
      />
      <NumberInput
        ref={_inputRef}
        className="mt-3"
        icon={Euro}
        placeholder="How much is in your bank today"
        enableStepper={false}
        onValueChange={(value) => setAmount(value)}
      />
      <div className="mt-3 flex items-center justify-end">
        <Button
          size="xs"
          className="min-w-[34px]"
          color="indigo"
          variant="primary"
          onClick={sendData}
          disabled={isPending}
        >
          {isPending ? <LoadingSpinner /> : 'Add data'}
        </Button>
      </div>
    </Card>
  )
}
