const viewer = document.querySelector('#shield-viewer');
const buttons = ['finish', 'metal', 'normal'].map(id => document.getElementById(id));
const status = document.getElementById('load-status');
const state = { worn: false, copper: false, relief: true };
let originals = [];
let bronze;

function fail(message) {
  buttons.forEach(button => { button.disabled = true; });
  status.className = 'load-status error';
  status.textContent = message;
}

function applyMaterials() {
  // Compose every state from immutable originals, never from the last click.
  for (const saved of originals) {
    const pbr = saved.material.pbrMetallicRoughness;
    const isBronze = saved.material === bronze;
    const tint = isBronze && state.copper ? [1, 0.38, 0.22] : [1, 1, 1];
    const age = state.worn ? (isBronze ? 0.52 : 0.65) : 1;
    pbr.setBaseColorFactor(saved.color.map((v, i) => i === 3 ? v : v * tint[i] * age));
    // Keep original base-color and metallic textures. Only the scalar roughness changes.
    // The baked maps contain spatial variation in both states.
    pbr.setRoughnessFactor(state.worn ? 1 : saved.roughness);
    pbr.setMetallicFactor(saved.metallic);
  }
  const originalBronze = originals.find(saved => saved.material === bronze);
  bronze.normalTexture.setTexture(state.relief ? originalBronze.normal : null);
  document.getElementById('finish-state').textContent = state.worn ? 'Desgastado' : 'Limpio';
  document.getElementById('metal-state').textContent = state.copper ? 'Cobre' : 'Bronce';
  document.getElementById('normal-state').textContent = state.relief ? 'Activado' : 'Desactivado';
  buttons[0].setAttribute('aria-pressed', String(state.worn));
  buttons[1].setAttribute('aria-pressed', String(state.copper));
  buttons[2].setAttribute('aria-pressed', String(state.relief));
  document.getElementById('change-status').textContent = `${state.worn ? 'Desgastado' : 'Limpio'}, ${state.copper ? 'cobre' : 'bronce'}, relieve ${state.relief ? 'activado' : 'desactivado'}.`;
}

viewer.addEventListener('load', () => {
  try {
    bronze = viewer.model.getMaterialByName('Bronce');
    if (!bronze?.normalTexture?.texture || !viewer.model.getMaterialByName('Madera') || !viewer.model.getMaterialByName('Cuero')) {
      throw new Error('El modelo no contiene los materiales esperados.');
    }
    originals = viewer.model.materials.map(material => ({
      material,
      color: [...material.pbrMetallicRoughness.baseColorFactor],
      roughness: material.pbrMetallicRoughness.roughnessFactor,
      metallic: material.pbrMetallicRoughness.metallicFactor,
      normal: material.normalTexture?.texture ?? null,
      baseColor: material.pbrMetallicRoughness.baseColorTexture?.texture ?? null,
      metallicRoughness: material.pbrMetallicRoughness.metallicRoughnessTexture?.texture ?? null,
    }));
    Object.assign(state, { worn: false, copper: false, relief: true });
    applyMaterials();
    buttons.forEach(button => { button.disabled = false; });
    document.querySelector('.load-track').hidden = true;
    status.textContent = 'Escudo cargado. Los tres controles están disponibles.';
    status.className = 'load-status ready';
    viewer.dataset.ready = 'true';
  } catch (error) {
    console.error(error);
    fail('No se pudieron preparar los materiales. Recarga la página para volver a intentarlo.');
  }
});
buttons[0].addEventListener('click', () => { state.worn = !state.worn; applyMaterials(); });
buttons[1].addEventListener('click', () => { state.copper = !state.copper; applyMaterials(); });
buttons[2].addEventListener('click', () => { state.relief = !state.relief; applyMaterials(); });
viewer.addEventListener('progress', event => {
  document.getElementById('progress').style.width = `${event.detail.totalProgress * 100}%`;
});
viewer.addEventListener('error', () => fail('No se pudo cargar el escudo. Comprueba tu conexión y recarga la página.'));
setTimeout(() => {
  if (!customElements.get('model-viewer')) fail('No se pudo iniciar el visor 3D. Recarga la página en un navegador actualizado.');
}, 15000);
