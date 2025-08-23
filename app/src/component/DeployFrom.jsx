import { useState } from "react"
import PendingPopUp from "./PopUp/PendingPopUp"
import FormField from "./FormField"
import ValidateForm from "../lib/ValidateForm"

export default function DeployForm({ onDeploy, user }) {
  const [name, setName] = useState("")
  const [arbiter, setArbiter] = useState("")
  const [services, setServices] = useState("")
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDeploy = async () => {
    if (!user) {
      setErrors({ global: "Please connect your wallet first!" })
      return
    }

    const { valid, newErrors } = ValidateForm({ name, arbiter, services, user })
    if (!valid) {
      setErrors(newErrors)
      return
    }

    try {
      setIsProcessing(true)
      await onDeploy({ name, arbiter, services })
      setName("")
      setArbiter("")
      setServices("")
      setErrors({})
    } catch (error) {
      console.error("Deployment error: ", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      {isProcessing && <PendingPopUp type="Escrow Deployment" />}

      <div className="flex flex-col gap-4 text-white bg-[#121d32] p-6 font-mono rounded-md h-fit w-full md:w-[36vw]">
        <h1 className="text-2xl font-semibold">Deploy New Escrow</h1>

        {errors.global && <p className="text-red-400 font-semibold">{errors.global}</p>}

        <FormField label="Escrow Name:" value={name} onChange={setName} error={errors.name} />
        <FormField label="Arbiter Address:" value={arbiter} onChange={setArbiter} error={errors.arbiter} />
        <FormField label="Service Provider Address:" value={services} onChange={setServices} error={errors.services} />

        <button
          onClick={handleDeploy}
          disabled={isProcessing}
          className="cursor-pointer bg-blue-600 mt-4 p-2 rounded-md font-semibold text-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isProcessing ? "Processing..." : "Deploy"}
        </button>
      </div>
    </>
  )
}