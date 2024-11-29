function addField(button, type, placeholder) {
    const container = button.closest(`.${type}-entry`);  // Find the closest container based on the type (education or languages)

    // Create a new input field container (input + buttons)
    const newField = document.createElement('div');
    newField.classList.add('d-flex', 'gap-2', 'mb-2', `${type}-item`); // Keep it consistent with the type

    // Set the HTML for the new field
    newField.innerHTML = `
        <input type="text" class="form-control form-control-sm" name="${type}" value="" placeholder="${placeholder}" required>
        <button type="button" class="remove-field btn btn-sm btn-danger" onclick="removeField(this, '${type}')">X</button>
    `;

    // Append the new field to the container
    container.appendChild(newField);

    // If there are multiple fields, change layout to vertical
    container.classList.add('flex-column'); // Stack the fields vertically
    container.classList.remove('d-flex'); // Remove horizontal layout
}

function removeField(button, type) {
    const field = button.closest(`.${type}-item`);
    field.remove();

    // // If the container is empty, revert layout back to horizontal
    // const container = button.closest(`.${type}-entry`);
    // if (container && container.children.length === 0) {
    //     container.classList.remove('flex-column'); // Remove vertical layout
    //     container.classList.add('d-flex'); // Revert back to horizontal layout
    // }
}
