import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryTable, Status } from './style'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function History() {

    const { cycles } = useContext(CyclesContext)



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
                        {cycles?.map(cycle => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.duration} minutos</td>
                                    <td>{formatDistanceToNow(cycle.startDate, {
                                        addSuffix: true,
                                        locale: ptBR,
                                    })}</td>
                                    <td>
                                        {cycle.finishedDate ? (
                                            <Status statusColor='green'>
                                                Concluído
                                            </Status>
                                        ) : cycle.interruptedDate ? (
                                            <Status statusColor='red'>
                                                Interrompido
                                            </Status>
                                        ) : (
                                            <Status statusColor='yellow'>
                                                Em andamento
                                            </Status>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryTable>
        </HistoryContainer>
    )
}