package tk.skmserver.ccdbridge.common.computercraft.peripherals;

import cc.tweaked_programs.cccbridge.common.computercraft.TweakedPeripheral;
import com.petrolpark.destroy.block.VatControllerBlock;
import com.petrolpark.destroy.block.entity.VatControllerBlockEntity;
import com.petrolpark.destroy.chemistry.Molecule;
import dan200.computercraft.api.lua.LuaException;
import dan200.computercraft.api.lua.LuaFunction;
import dan200.computercraft.api.peripheral.IComputerAccess;
import dan200.computercraft.core.computer.ComputerSide;
import net.minecraft.core.Direction;
import tk.skmserver.ccdbridge.common.minecraft.mixininterface.VatControllerBlockEntityMixinInterface;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class VatBlockPeripheral extends TweakedPeripheral<VatControllerBlockEntity> {
    public static double getVersion() {
        return 1.0D;
    }

    public VatBlockPeripheral(VatControllerBlockEntity blockentity) {
        super("vat", blockentity);
    }

    @LuaFunction
    public final float getPressure() throws LuaException {
        VatControllerBlockEntity be = getTarget();
        if (be != null) {
            return be.getPressure();
        }
        throw new LuaException("Unable to find peripheral");
    }

    @LuaFunction
    public final float getTemperature() throws LuaException {
        VatControllerBlockEntity be = getTarget();
        if (be != null) {
            return be.getTemperature();
        }
        throw new LuaException("Unable to find peripheral");
    }

    @LuaFunction
    public final float getUVStrength() throws LuaException {
        VatControllerBlockEntityMixinInterface be = (VatControllerBlockEntityMixinInterface) getTarget();
        if (be != null) {
            return be.ccdbridge$getUVPower();
        }
        throw new LuaException("Unable to find peripheral");
    }

    @LuaFunction
    public final float getCapacity() throws LuaException {
        VatControllerBlockEntity be = getTarget();
        if (be != null) return be.getCapacity();
        throw new LuaException("Unable to find peripheral");
    }

    @LuaFunction
    public final float getFluidLevel() throws LuaException {
        VatControllerBlockEntity be = getTarget();
        if (be != null) return be.getFluidLevel();
        throw new LuaException("Unable to find peripheral");
    }

    @LuaFunction
    public final Map<String, Float> getMixture() throws LuaException {
        VatControllerBlockEntity be = getTarget();
        if (be != null) return be.getCombinedReadOnlyMixture().getContents(false).stream().collect(Collectors.toMap(
                Molecule::getFullID,
                m -> be.getCombinedReadOnlyMixture().getConcentrationOf(m)
                ));

        throw new LuaException("Unable to find peripheral");
    }

}