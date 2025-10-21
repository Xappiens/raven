import { CustomCallout } from "@/components/common/Callouts/CustomCallout"
import useRavenSettings from "@/hooks/fetchers/useRavenSettings"
import { Link as RadixLink, Text } from "@radix-ui/themes"
import { BiInfoCircle } from "react-icons/bi"
import { Link } from "react-router-dom"

const AINotEnabledCallout = () => {

    const { ravenSettings } = useRavenSettings()

    // Check if AI is enabled and at least one provider is configured
    const isAIEnabled = ravenSettings?.enable_ai_integration === 1
    const hasOpenAI = ravenSettings?.enable_openai_services === 1
    const hasLocalLLM = ravenSettings?.enable_local_llm === 1

    if (isAIEnabled && (hasOpenAI || hasLocalLLM)) {
        return null
    }

    const message = !isAIEnabled
        ? "atu AI no está habilitado. Por favor, actívalo en"
        : "No hay proveedores de IA configurados. Por favor, configura al menos uno en"

    return (
        <CustomCallout
            iconChildren={<BiInfoCircle size='18' />}
            rootProps={{ color: 'blue', variant: 'surface' }}
            textChildren={<Text>{message} <RadixLink asChild color='blue' underline='always'><Link to='/settings/ai-settings'>AI Settings</Link></RadixLink></Text>}
        />
    )
}

export default AINotEnabledCallout
