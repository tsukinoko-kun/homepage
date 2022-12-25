import { XmlTag } from "./XmlTag"

type Props = {
    error: Error,
    resetErrorBoundary: () => void,
}

export const ErrorFallback = (props: Props) => (
    <XmlTag tag="ErrorFallback">
        <div role="alert">
            <XmlTag tag="p">Something went wrong:</XmlTag>
            <XmlTag tag="p"><pre>{props.error.message}</pre></XmlTag>
            <XmlTag tag="button">
                <button onClick={props.resetErrorBoundary}>Try again</button>
            </XmlTag>
        </div>
    </XmlTag>
)

export default ErrorFallback
