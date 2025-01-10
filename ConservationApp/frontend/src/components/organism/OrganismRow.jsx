function OrganismRow({organism: organism}) {
    return (

        <tr key={organism.tag}>
            <td>
                {organism.tag}
            </td>
            <td>
                {organism.age}
            </td>
            <td>
                {organism.sex}
            </td>
            <td>
                {organism.species_name}
            </td>
        </tr>
    );
}

export default OrganismRow;