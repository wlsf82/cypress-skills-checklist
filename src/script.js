document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  const checkedCountElement = document.getElementById('checkedCount')
  const totalCountElement = document.getElementById('totalCount')
  const percentageElement = document.getElementById('percentage')
  const skillLevelElement = document.getElementById('skillLevel')

  totalCountElement.textContent = checkboxes.length

  function updateCheckboxCounts() {
    const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length
    checkedCountElement.textContent = checkedCount
    const percentage = (checkedCount / checkboxes.length * 100).toFixed(0)
    percentageElement.textContent = percentage

    if (percentage < 50) {
      skillLevelElement.textContent = 'Iniciante (Jr.)'
    } else if (percentage >= 50 && percentage < 75) {
      skillLevelElement.textContent = 'Intermediário (Pleno)'
    } else if (percentage >= 75 && percentage < 95) {
      skillLevelElement.textContent = 'Avançado (Sr.)'
    } else {
      skillLevelElement.textContent = 'DevOps'
    }
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateCheckboxCounts)
  })

  // Initial update on page load
  updateCheckboxCounts()
})

// Check for saved user theme preference, if any, and apply it
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light' // Default to light theme
  document.documentElement.setAttribute('data-theme', savedTheme)
  updateToggleButton(savedTheme) // Set the button text based on the saved theme
})

document.getElementById('themeToggle').addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
  updateToggleButton(newTheme) // Update the button text based on the new theme
})

function updateToggleButton(theme) {
  const themeToggle = document.getElementById('themeToggle')
  themeToggle.textContent = theme === 'dark' ? '☀' : '☽' // Set text as sun for light mode, moon for dark mode
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode') // Accessibility improvement
}
