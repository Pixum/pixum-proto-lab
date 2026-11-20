import { variableSchema } from '../variables/schema'
import { useVariables } from '../variables/store'
import Control from './controls/Control'
import Group from './Group'
import styles from './Sidebar.module.css'

// Group the schema by its `group` field, keeping first-seen order.
const groups = Array.from(
  variableSchema.reduce((map, v) => {
    map.set(v.group, [...(map.get(v.group) ?? []), v])
    return map
  }, new Map<string, typeof variableSchema>()),
)

export default function Sidebar() {
  const reset = useVariables((s) => s.reset)
  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Experimental Layouts</h1>
          <p className={styles.description}>
            A playground for seeing how global design variables reshape every page of a book in real time.
          </p>
        </div>
        <button className={styles.reset} type="button" onClick={reset}>
          Reset
        </button>
      </header>
      <div className={styles.body}>
        {groups.length === 0 && <p className={styles.empty}>No variables defined yet.</p>}
        {groups.map(([name, defs]) => (
          <Group key={name} title={name}>
            {defs.map((def) => (
              <Control key={def.id} def={def} />
            ))}
          </Group>
        ))}
      </div>
    </aside>
  )
}
