import React from 'react'

const variantStyles = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/80',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
  outline: 'text-foreground border border-input hover:bg-accent hover:text-accent-foreground'
}

const Badge = React.forwardRef(({ className = '', variant = 'default', ...props }, ref) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
  const variantStyle = variantStyles[variant] || variantStyles.default
  const combinedStyles = `${baseStyles} ${variantStyle} ${className}`

  return (
    <div ref={ref} className={combinedStyles} {...props} />
  )
})

Badge.displayName = 'Badge'

export { Badge }