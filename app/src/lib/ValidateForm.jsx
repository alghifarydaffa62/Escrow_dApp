
export default function ValidateForm({name, arbiter, services, user}) {
   const errors = {}
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/

    if (!name || name.trim() === "") {
        errors.name = "Please input escrow name"
    } else if (name.trim().length < 3) {
        errors.name = "Escrow name must be at least 3 characters"
    } else if (name.trim().length > 32) {
        errors.name = "Escrow name can't be longer than 32 characters"
    } else if (!/^[a-zA-Z0-9 ]+$/.test(name.trim())) {
        errors.name = "Escrow name can only contain letters, numbers, and spaces"
    }

    if (!arbiter) {
        errors.arbiter = "Please input the arbiter address"
    } else if (!ethAddressRegex.test(arbiter)) {
        errors.arbiter = "Invalid arbiter address!"
    }

    if (!services) {
        errors.services = "Please input the service provider address"
    } else if (!ethAddressRegex.test(services)) {
        errors.services = "Invalid service provider address!"
    }

    if (arbiter && services && arbiter.toLowerCase() === services.toLowerCase()) {
        errors.services = "Arbiter & Service provider address can't be same!"
    }

    if (user) {
        if (arbiter && user.toLowerCase() === arbiter.toLowerCase()) {
            errors.arbiter = "Deployer & arbiter address can't be same!"
        }
        if (services && user.toLowerCase() === services.toLowerCase()) {
            errors.services = "Deployer & service provider address can't be same!"
        }
    }

    return { valid: Object.keys(errors).length === 0, newErrors: errors }
}