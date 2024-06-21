document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  const checkedCountElement = document.getElementById('checkedCount')
  const totalCountElement = document.getElementById('totalCount')
  const percentageElement = document.getElementById('percentage')

  totalCountElement.textContent = checkboxes.length

  function updateCheckboxCounts() {
    const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length
    checkedCountElement.textContent = checkedCount
    const percentage = (checkedCount / checkboxes.length * 100).toFixed(0)
    percentageElement.textContent = percentage
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateCheckboxCounts)
  })

  // Initial update on page load
  updateCheckboxCounts()
})
