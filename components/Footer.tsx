import { XmlTag } from "./XmlTag"

export const Footer = () => (
    <>
        <br />
        <XmlTag tag="footer">
            <XmlTag tag="table">
                <XmlTag tag="tbody">
                    <XmlTag tag="tr">
                        <table cellSpacing={0}>
                            <tbody>
                                <tr>
                                    <td>
                                        <XmlTag tag="td">
                                            <XmlTag tag="a" href="https://github.com/Frank-Mayer">GitHub</XmlTag>
                                        </XmlTag>
                                    </td>
                                    <td>
                                        <XmlTag tag="td">
                                            <XmlTag tag="a" href="https://www.linkedin.com/in/frank-mayer-b85677214">LinkedIn</XmlTag>
                                        </XmlTag>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </XmlTag>
                </XmlTag>
            </XmlTag>
        </XmlTag>
    </>
)
