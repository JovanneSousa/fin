import New from "../New"
import { Analysis } from "./styles"

const AnalysisSection = () => {
    return (
        <Analysis>
            <nav>
                <ul>
                    <li className="is-active">
                        Visão Geral
                    </li>
                    <li>
                        Categorias
                    </li>
                    <li>
                        Comparação
                    </li>
                    <li>
                        Projeção
                    </li>
                </ul>
            </nav>
            <div>
                <New />
            </div>
        </Analysis>
    )
}

export default AnalysisSection