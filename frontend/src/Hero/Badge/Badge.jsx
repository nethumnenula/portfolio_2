import { MdCode } from "react-icons/md";
import styles from "./Badge.module.css";

function Badge({
  name = "",
  techItem1 = "",
  techItem2 = "",
  techItem3 = "",
  icon: IconComponent = MdCode,
  position = "bottomRight",
}) {
  const positionClass = {
    'top-left': styles.topLeft,
    'top-right': styles.topRight,
    'bottom-left': styles.bottomLeft,
    'bottom-right': styles.bottomRight,
    'custom1': styles.customPosition1,
  }[position] || styles.bottomRight;

  return (
    <div className={`${styles.floatingBadge} ${positionClass}`}>
      <div className={styles.badgeHeader}>
        <IconComponent className={styles.badgeIcon} />
        <span>{name}</span>
      </div>
      <div className={styles.badgeTech}>
        <span className={styles.techItem}>{techItem1}</span>
        <span className={styles.techItem}>{techItem2}</span>
        <span className={styles.techItem}>{techItem3}</span>
      </div>
    </div>
  );
}

export default Badge;