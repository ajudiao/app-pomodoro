import { HistoryContainer, HistoryTable, Status } from "./style";


export function History() {
    return (
        <HistoryContainer>
            <h1>History</h1>

            <HistoryTable>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Projecto 1</td>
                            <td>20 min</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="red">
                                    Concluído
                                </Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Projecto 1</td>
                            <td>20 min</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="red">
                                    Concluído
                                </Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Projecto 1</td>
                            <td>20 min</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="green">
                                    Concluído
                                </Status>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </HistoryTable>
        </HistoryContainer>
    )
}