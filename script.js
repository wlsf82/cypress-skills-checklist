document.addEventListener('DOMContentLoaded', function() {
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

    // Update skill level based on percentage
    if (percentage < 50) {
      skillLevelElement.textContent = 'Beginner'
    } else if (percentage >= 50 && percentage < 75) {
      skillLevelElement.textContent = 'Intermediate'
    } else {
      skillLevelElement.textContent = 'Advanced'
    }
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateCheckboxCounts)
  })

  // Initial update on page load
  updateCheckboxCounts()
})
